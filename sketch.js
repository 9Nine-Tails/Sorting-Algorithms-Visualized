let img, sel, btn;
let strips;
let stripSize = 5;
let done = false;
let w, h, k = 0, x = 1;

function preload() {
	img = loadImage('luca-bravo.jpg');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	let imageRatio = 1.6;
	h = height;
	w = height * imageRatio;
	background(0);
	image(img,0,0,w,h);
	strips = new Array(floor(w/stripSize));
	for(let i = 0; i < w/stripSize; i++) {
		strips[i] = [get(i*stripSize,0,stripSize,h), i];
	}
	shuffle(strips, true);
	sel = createSelect();
	sel.position(w+100,100);
	sel.option('Bubble');
	sel.option('Selection');
	sel.option('Insertion');
	sel.changed(reshuffle);
	btn = createButton('Restart');
	btn.position(w+100,150);
	btn.mousePressed(reshuffle);
}

function draw() {
	background(0);

	if(!done) {
		switch (sel.value()) {
			case 'Bubble':
				bubbleSort();
				break;
			case 'Selection':
				selectionSort();
				break;
			case 'Insertion':
				insertionSort();
				break;
			default:
				bubbleSort();
		}
	} else {
		console.log('done!');
		noLoop();
	}

	for(let i = 0; i < w/stripSize; i++) {
		image(strips[i][0], i*stripSize, 0);
	}
}

function bubbleSort() {
	if(k<strips.length-1) {
		for(let j=0; j<strips.length-k-1;j++) {
			if(strips[j][1]>strips[j+1][1]) {
				let temp = strips[j];
				strips[j] = strips[j+1];
				strips[j+1] = temp;
			}
		}
		k++;
	} else {
		done = true;
	}
}

function selectionSort() {
	let min_idx;
	if(k<strips.length-1) {
		min_idx = k;
		for(let j=k+1; j<strips.length; j++) {
			if(strips[j][1] < strips[min_idx][1]) {
				let temp = strips[j];
				strips[j] = strips[min_idx];
				strips[min_idx] = temp;
			}
		}
		k++;
	} else {
		done =true;
	}
}

function insertionSort() {
	let key;
	if(x<strips.length) {
		key = strips[x];
		j = x-1;
		while(j >= 0 && strips[j][1] > key[1]) {
			strips[j+1] = strips[j];
			j = j - 1;
		}
		strips[j+1] = key;
		x++;
	} else {
		done = true;
	}
}

function reshuffle() {
	k = 0;
	x = 1;
	done = false;
	shuffle(strips, true);
	loop();
}
