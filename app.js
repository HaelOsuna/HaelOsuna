const {google} = require ('googleapis');
const path = require ('path')
const fs = require ('fs')

const CLIENT_ID = '1093175988760-j8tom0bto99ui04gqsuouu221camfv7p.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04TgEkGKZXAqACgYIARAAGAQSNwF-L9IrL_Ez8qU69zw44rTTCmqdc4-NlpdsaDm7PzL1AUgetj0ZhB7CIsUbBSmzC4TJ7sJsap8'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filepath = path.join(__dirname,'archivo.txt')

async function uploadFile()
{
    try {
        const response = await drive.files.create({
            requestBody:{
                name:'archivo.txt',
                mimeType: 'text/txt'
            },
            media:{
                mimeType: 'text/txt',
                body: fs.createReadStream(filepath)
            }
        })

        console.log(response.data);

    } catch (error) {
        console.log(error.message);
    }
}

uploadFile();