const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");
const delayCheck = document.querySelector(".delay-check input");

let audioContext;
let mappedKeys = [];
let activeNotes = [];

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
};

const playTune = (key) => {
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  const audio = new Audio(`./tunes/${clickedKey.dataset.tune}.wav`);

  audio.volume = volumeSlider.value;

  if (!delayCheck.checked) {
    stopActiveNotes();
  }

  const note = {
    audio,
    nodes: null,
    cleanupTimeout: null,
  };

  if (delayCheck.checked) {
    note.nodes = createDelayNodes(audio);
  }

  activeNotes.push(note);
  audio.play();

  if (delayCheck.checked) {
    audio.addEventListener("ended", () => {
      note.cleanupTimeout = setTimeout(() => {
        disconnectDelayNodes(note);
        removeActiveNote(note);
      }, 2500);
    });
  } else {
    audio.addEventListener("ended", () => removeActiveNote(note));
  }

  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mappedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if (mappedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

const handleVolume = (e) => {
  activeNotes.forEach((note) => {
    note.audio.volume = e.target.value;
  });
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const createDelayNodes = (audio) => {
  const context = getAudioContext();
  const source = context.createMediaElementSource(audio);
  const dryGain = context.createGain();
  const delay = context.createDelay();
  const feedback = context.createGain();
  const wetGain = context.createGain();

  dryGain.gain.value = 0.85;
  delay.delayTime.value = 0.28;
  feedback.gain.value = 0.42;
  wetGain.gain.value = 0.45;

  source.connect(dryGain);
  dryGain.connect(context.destination);

  source.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wetGain);
  wetGain.connect(context.destination);

  return { source, dryGain, delay, feedback, wetGain };
};

const disconnectDelayNodes = (note) => {
  if (!note.nodes) {
    return;
  }

  Object.values(note.nodes).forEach((node) => node.disconnect());
  note.nodes = null;
};

const removeActiveNote = (note) => {
  activeNotes = activeNotes.filter((activeNote) => activeNote !== note);
};

const stopActiveNotes = () => {
  activeNotes.forEach((note) => {
    clearTimeout(note.cleanupTimeout);
    note.audio.pause();
    note.audio.currentTime = 0;
    disconnectDelayNodes(note);
  });
  activeNotes = [];
};

const handleDelay = () => {
  if (!delayCheck.checked) {
    stopActiveNotes();
  }
};

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);

delayCheck.addEventListener("change", handleDelay);
