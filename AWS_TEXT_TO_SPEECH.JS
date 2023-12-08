const express = require('express');
const app = express();
app.use(express.json());
app.use(express.json());
app.use(cors());
const AWS = require('aws-sdk');
const polly = new AWS.Polly(
    {
        accessKeyId: 'AKIAXWUTJVZ4QQFRA3MT',
        secretAccesskey: '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',
        region: 'ap-south-1'
    });

    app.post('/text-to-speech',async (req,res) =>
    {
        const{ text,Joanna } = req.body;

        const params = 
        {
            Text: text,
            VoiceId: Joanna,
            OutputFormat: 'mp'
        };
  try{
    const response = await polly.synthesizeSpeech(params).promise();
    res.setHeader('Content-Type','audio/mpeg');
    res.send(response.AudioStream);
  }
    catch (err)
    {
        console.error(err);
        res.status(500).json(
            {
                eroor:'Text-to-speech conversion failed' });
            }
        });
        app.listen(5000, () =>
        {
            console.log('server is running on port 5000');
        });
