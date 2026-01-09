import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Sheet1';

export async function getWishes() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:D`,
    });

    const rows = response.data.values || [];
    
    return rows.map((row, index) => ({
      id: index + 1,
      timestamp: row[0],
      name: row[1],
      content: row[2],
      isHighlight: row[3] === 'TRUE',
    }));
  } catch (error) {
    console.error('Error reading from sheet:', error);
    throw error;
  }
}

export async function addWish(data) {
  try {
    const timestamp = new Date().toISOString();
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          timestamp,
          data.name,
          data.content,
          data.isHighlight ? 'TRUE' : 'FALSE'
        ]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error writing to sheet:', error);
    throw error;
  }
}

export async function addRsvp(data) {
    try {
      const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      
      // Ghi vào tab tên là "RSVP"
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: 'RSVP!A:E', 
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            timestamp,
            data.name,
            data.guests,
            data.guestOf === 'groom' ? 'Nhà Trai' : 'Nhà Gái',
            data.attendance === 'yes' ? 'Có' : 'Không'
          ]],
        },
      });
  
      return { success: true };
    } catch (error) {
      console.error('Error writing RSVP to sheet:', error);
      throw error;
    }
  }