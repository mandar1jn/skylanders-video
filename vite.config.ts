import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

import arrayBufferPlugin from "vite-plugin-arraybuffer";

export default defineConfig({
  plugins: [
    motionCanvas(),
    ffmpeg(),
	arrayBufferPlugin()
  ],
});
