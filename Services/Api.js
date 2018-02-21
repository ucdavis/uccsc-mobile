import { parse } from '../Utils/JsonApi';

export async function getSchedule() {
  const fields = [
    // 'type',
    // 'revision_uid',
    // 'uid',
    'field_event_sponsors',
    'field_event_venue',
    'field_session_files',
    'field_session_length',
    'field_session_skill_level',
    'field_session_speakers',
    'field_session_speakers.field_uccsc_user_photo',
    'field_session_track',
    'field_session_type',
  ].join(',');

  // url
  const url = `https://test-uccsc.pantheonsite.io/jsonapi/node/session?include=${fields}`;

  // fetch sessions
  const response = await fetch(url);

  const result = parse(await response.text());

  const sessions = result.data.map(d => {
    const speakers = d.field_session_speakers.map(s => {
      return {
        name: s.name,
      };
    });

    const session = {
      type: 'talk',
      speaker: speakers[0].name,
      title: d.title,
      description: d.field_session_description.value,
      speakerInfo: speakers[0],
      time: '7/10/2017 8:45 AM',
      duration: d.field_session_length.name,
    };

    return session;
  });

  return sessions;
}
