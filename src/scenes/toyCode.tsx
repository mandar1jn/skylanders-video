import { Layout, makeScene2D, Txt } from '@motion-canvas/2d';
import { all, createRef, delay, Reference, waitFor } from '@motion-canvas/core';

const lookup = "23456789BCDFGHJKLMNPQRSTVWXYZ";

export default makeScene2D(function* (view) {

	yield view.add(
	<>
		{
			Array.from(lookup).map((val, i) => {

				const x = -1880 + (3760 / (lookup.length - 1)) * i

				return (
					<>
						<Txt text={`'${val}'`} fill={"white"} fontSize={50} x={x} y={-1020} />
						<Txt text={i.toString()} fill={"white"} fontSize={50} x={x} y={-950} />
					</>
				)
			})
		}
	</>);

	let encodedNumber = 367429697391371;
	const encodedNumberRef = createRef<Txt>();
	view.add(<Txt text={encodedNumber.toString()} fill={"#FFFFFF"} ref={encodedNumberRef} />);

	let characters: Reference<Txt>[] = [];

	for(let i = 0; i < 10; i++)
	{
		const currentNumber = createRef<Txt>();
		characters.push(currentNumber);
		let currentNumberValue = encodedNumber % 29;

		view.add(<Txt text={"% 29"} position={{x: 300, y: 0}} fill={"white"} opacity={0} ref={currentNumber} />)

		yield* currentNumber().opacity(1, 0.5);

		yield* all(
			currentNumber().opacity(0, 0.5),
			currentNumber().x(0, 0.5)
		);

		currentNumber().text(currentNumberValue.toString());

		const division = createRef<Txt>();

		view.add(<Txt text={"/ 29"} position={{x: 300, y: 0}} fill={"white"} opacity={0} ref={division} />)

		yield* all(
			currentNumber().opacity(1, 0.5),
			currentNumber().x(-300, 0.5),
			division().opacity(1, 0.5)
		);

		encodedNumber /= 29;
		encodedNumber = Math.floor(encodedNumber);

		yield* all(
			encodedNumberRef().text(encodedNumber.toString(), 0.5),
			division().x(0, 0.5),
			division().opacity(0, 0.5)
		);

		yield all(
			currentNumber().text(lookup.charAt(currentNumberValue), 0.5),
			currentNumber().y(500, 0.5),
			currentNumber().x(-1000 + (2000 / 9) * i, 0.5)
		)

	}

	yield* waitFor(0.75);
	
	yield* all(
		...characters.map((val, i) => {
			return val().x(1000 - (2000 / 9) * i, 1);
		}),
	)

	const dashCharacterRef = createRef<Txt>();
	view.add(<Txt fill="white" opacity={0} ref={dashCharacterRef} text="-" x={0} y={500} />)

	yield* all(
		...characters.map((val, i) => {
			return val().x(1000 - (2000 / 10) * (i < 5? i : i + 1), 1.5);
		}),
		delay(0.5, dashCharacterRef().opacity(1, 1))
	);

	yield* waitFor(2);

	yield* all(
		...characters.map((val, index) => {
			return all(val().x(-300, 1), val().y(800 - (800 / 9) * index, 1))
		}),
		dashCharacterRef().opacity(0, 0.5)
	)

	yield* all(
		...characters.map(val => {
			return val().text(lookup.indexOf(val().text()).toString(), 1)
		})
	)

	for(let i = 9; i >= 0; i--)
	{
		const character = characters[i];

		const multiplyRef = createRef<Txt>();

		view.add(<Txt text={"x 29"} x={300} fill={"white"} opacity={0} ref={multiplyRef}/>)

		yield* multiplyRef().opacity(1, 0.5)

		encodedNumber *= 29;

		yield* all(
			multiplyRef().x(0, 0.5),
			multiplyRef().opacity(0, 0.5),
			encodedNumberRef().text(encodedNumber.toString(), 0.5)
		)

		encodedNumber += parseInt(character().text());

		yield* all(
			character().opacity(0, 0.5),
			character().x(0, 0.5),
			encodedNumberRef().text(encodedNumber.toString(), 0.5),
			//i != 0? multiplyRef().opacity(1, 0.5) : null,
			...characters.filter((_, index) => index < i).map((val, index) => {
				return val().y((800 / 9) * (i - index - 1), 0.5);
			})
		)

		yield* waitFor(0.1)
	}

});
