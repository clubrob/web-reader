import Data from './data';
import UI from './ui';

async function returnClips() {
  let clips = await Data.getClips();
  console.log(clips.length);
  return clips;
}

returnClips().then((clips) => {
  UI.populateList(clips)
});