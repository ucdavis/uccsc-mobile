
export async function getSchedule() {

  // url
  const url = 'https://us-central1-uccsc-ac393.cloudfunctions.net/getAllSessions';

  // fetch sessions
  const response = await fetch(url);

  const sessions = JSON.parse(await response.text());

  return sessions;
}
