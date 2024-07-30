import Carousel from './_components/carousel';
import Slider1 from '../public/slider-1.png';
import Slider2 from '../public/slider-2.png';
import Slider3 from '../public/slider-3.png';
import Slider4 from '../public/slider-4.png';

export default function Home() {
	return (
		<main>
			<div className='mx-auto max-w-5xl md:h-[42rem] sm:h-[30rem] h-[21rem] py-3'>
				<Carousel images={[{
					src: Slider1.src,
					alt: ''
				}, {
					src: Slider2.src,
					alt: ''
				}, {
					src: Slider3.src,
					alt: ''
				}, {
					src: Slider4.src,
					alt: ''
				}]} />
			</div>
		</main>
	);
}