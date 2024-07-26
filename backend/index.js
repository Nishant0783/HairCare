import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose schemas and models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  // age: { type: Number, required: true },
  stressLevel: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  familyHistory: { type: String, enum: ['Yes', 'No'], required: true },
  image: { type: String, required: true },
});

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  report: { type: Object, required: true },
});

const User = mongoose.model('User', userSchema);
const Report = mongoose.model('Report', reportSchema);

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function analyzeImage(file) {
  const imageBuffer = await fs.readFile(file.path);
  const imageBase64 = imageBuffer.toString('base64');

  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Analyze this image:
1. Is it related to hair loss/thinning? (Yes/No)
2. If yes, list 2 key visual indicators.
3. If no, briefly state what the image shows instead.
Limit your response to 3 sentences maximum.

Please format your response as a JSON object with the following structure:
{
  "isHairfall": true/false,
  "visualIndicators": ["Indicator 1", "Indicator 2"],
  "imageDescription": ""
}
`
        },
        {
          type: "image",
          source: {
            type: "base64",
            media_type: file.mimetype,
            data: imageBase64
          }
        }
      ]
    }
  ];

  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1000,
    messages: messages
  });

  // Delete the file after processing
  await fs.unlink(file.path);

  return JSON.parse(response.content[0].text);
}

async function generateDetailedReport(file) {
  const imageBuffer = await fs.readFile(file.path);
  const imageBase64 = imageBuffer.toString('base64');

  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Analyze this scalp image as a dermatologist:

Baldness Stage: Estimate using Norwood scale for male pattern baldness
Hair Density: Provide a general assessment (e.g. normal, moderately reduced, severely reduced)
Scalp Condition: Note any visible issues (e.g. normal, dry, inflamed, scaling)
Risk Factor: Rate progression risk on a scale of 1-5
Key Observations: List 2-3 significant findings
Recommendations: Suggest 2-3 next steps or treatment options
Provide concise answers for each point, avoiding overly specific numeric estimates that can't be accurately determined from a single image. Limit each response to 10-15 words.

Please format your response as a JSON object with the following structure:
{
  "baldnessStage": "",
  "hairDensity": "",
  "scalpCondition": "",
  "riskFactor": "",
  "keyObservations": ["observation1", "observation2", "observation3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}
`
        },
        {
          type: "image",
          source: {
            type: "base64",
            media_type: file.mimetype,
            data: imageBase64
          }
        }
      ]
    }
  ];

  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1000,
    messages: messages
  });

  // Delete the file after processing
  await fs.unlink(file.path);

  return JSON.parse(response.content[0].text);
}


app.post('/analyzeImage', upload.single('file'), async (req, res) => {
  try {
    const result = await analyzeImage(req.file);
    console.log("Result of image analysis is: ", result)
    res.status(200).json(result);

  } catch (error) {
    console.error('Error in /analyzeImage route:', error);
    res.status(500).json({ message: 'Error analyzing image', error: error.message });
  }
});

app.post('/submit', upload.single('file'), async (req, res) => {
  try {
    const { fullName, email, phoneNumber, age, stressLevel, familyHistory } = req.body;
    console.log("name is: ", fullName)

    // Save user data to MongoDB
    const newUser = new User({
      name: fullName,
      email,
      phoneNumber,
      // age,
      stressLevel,
      familyHistory,
      image: req.file.path,
    });
    const savedUser = await newUser.save();

    const report = await generateDetailedReport(req.file);

    // Save report to MongoDB
    const newReport = new Report({
      userId: savedUser._id,
      report,
    });
    await newReport.save();

    console.log("Result of whole analysis is: ", report)
    res.status(200).json({ 
      message: "Data received and analyzed successfully",
      report: report 
    });
  } catch (error) {
    console.error('Error in /submit route:', error); 
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
