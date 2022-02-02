const { google } = require("googleapis");

const getForms = async () => {
  // authorize using the service account
  const auth = new google.auth.GoogleAuth({
    keyFile: "./credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  // generate an auth client for use with google sheets api
  const client = await auth.getClient();
  const builderId = `${process.env.BUILDER_SPREADSHEET_ID}`;
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // start pulling data
  const meta = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId: builderId,
  });
  const sheets = meta.data.sheets.map((sheet) => sheet.properties.title);
  const getData = async () => {
    return Promise.all(
      sheets.map(async (sheet) => {
        const data = await googleSheets.spreadsheets.values.get({
          auth,
          spreadsheetId: builderId,
          range: sheet,
        });
        return data;
      })
    );
  };
  const sheetData = await getData().then((data) => {
    return data;
  });

  meta.sheetData = sheetData;

  return meta;
};

exports.handler = async (event, context) => {
  const formData = await getForms();

  return {
    statusCode: formData.status,
    body: JSON.stringify(formData),
  };
};
