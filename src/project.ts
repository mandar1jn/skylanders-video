import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import example from './scenes/example?scene';

export default makeProject({
  scenes: [introduction, example],
});
