import { Circle, Code, lines, makeScene2D, Txt } from '@motion-canvas/2d';
import { createRef, waitFor } from '@motion-canvas/core';

import whirlwindFigure from "../assets/figures/Whirlwind.bin?uint8array";

export default makeScene2D(function* (view) {

	let figureString = "";

	for(let i = 0; i < 64; i++)
	{
		for(let j = 0; j < 16; j++)
		{
			figureString += whirlwindFigure[16 * i + j].toString(16).padStart(2, '0').toUpperCase();

			if(j != 15)
			{
				figureString += " ";
			}
		}

		figureString += "\n";
	}

	const text = createRef<Code>();

	view.add(<Code code={figureString} maxHeight={2160} fontSize={30} lineHeight={32} width={850} fill={'white'} ref={text} />);

	for(let i = 0; i < 16; i++)
	{
		yield* text().selection(lines(i * 4, i * 4 + 3), 0.5);
	}

	for(let i = 0; i < 64; i++)
	{
		yield* text().selection(lines(i), 0.05);
	}

	yield* waitFor(2);
});
