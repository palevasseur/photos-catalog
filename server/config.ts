
let _config = {
  dev: {
    photosDirectory: "./ressources/photos"
  }
};

export function config() {
  // todo: prod
  return _config.dev;
}


