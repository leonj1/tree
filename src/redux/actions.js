export const START_GET_INITIAL_PATH = 'START_GET_INITIAL_PATH';
export const FAILED_GET_INITIAL_PATH = 'FAILED_GET_INITIAL_PATH';
export const SUCCESS_GET_INITIAL_PATH = 'SUCCESS_GET_INITIAL_PATH';
export const START_GET_PATH = 'START_GET_PATH';
export const FAILED_GET_PATH = 'FAILED_GET_PATH';
export const SUCCESS_GET_PATH = 'SUCCESS_GET_PATH';

export function getInitialPath(resource, path) {
  // TODO validate resource is a string, not an object
  return {
    type: START_GET_INITIAL_PATH,
    payload: {
      bri: resource,
      path: path
    }
  }
}

export function getPath(path) {
  return {
    type: START_GET_PATH,
    payload: path
  }
}
