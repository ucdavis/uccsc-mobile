
const baseUrl = 'https://us-central1-uccsc-ac393.cloudfunctions.net';

export async function getActivities() {
  const url = `${baseUrl}/getAllActivities`;
  const response = await fetch(url);
  return await response.json();
}

export async function getTalks() {
  const url = `${baseUrl}/getAllSessions`;
  const response = await fetch(url);
  return await response.json();
}

export async function getNews() {
  const url = `${baseUrl}/getAllArticles`;
  const response = await fetch(url);
  return await response.json();
}
