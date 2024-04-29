const VIDEO_TYPE = `video`;
const PLAYBACK_RATE = 2;

const handleVideoElementAdded = (video) => {
  video.playbackRate = PLAYBACK_RATE;

  video.addEventListener(`ratechange`, () => {
    video.playbackRate = PLAYBACK_RATE;
  });
};

const handleMutation = (mutation) => {
  if (mutation.type === `childList`) {
    for (const node of mutation.addedNodes) {
      if (node instanceof Element) {
        const videoElements = [
          ...(node.matches(VIDEO_TYPE) ? [node] : []),
          ...node.querySelectorAll(VIDEO_TYPE),
        ];

        videoElements.forEach(handleVideoElementAdded);
      }
    }
  }
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach(handleMutation);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const initialVideoElements = document.querySelectorAll(`video`);

initialVideoElements.forEach(handleVideoElementAdded);
