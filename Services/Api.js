
const baseUrl = 'https://us-central1-uccsc-ac393.cloudfunctions.net';

export async function getActivities() {
  const url = `${baseUrl}/getAllActivities`;
  const response = await fetch(url);
  return JSON.parse(await response.text());
}

export async function getTalks() {
  const url = `${baseUrl}/getAllSessions`;
  const response = await fetch(url);
  return JSON.parse(await response.text());
}
