import { useState, useContext } from "react";

import UserContext from "../context/User";

import { v1 } from "../../utils/Resolve";

import { valid, removeTrailingSlash } from "../../utils/Handshakename";

import Error from "../message/Error";

import Working from "../message/Resolving";

import styles from "../../styles/Resolver.module.css";

const Form = () =>
{
	const initialState = "";

	const { rememberVisited } = useContext( UserContext );
	
	const [ handshakename, setHandshakename ] = useState( initialState );

	const [ message, setMessage ] = useState( initialState );

	const errorHandler = () =>
	{
		setMessage( <Error handshakename={handshakename} /> );
		
		setTimeout( () =>
		{
			setMessage( initialState );
			
		}, 15_000 );
	
	}

	const submitHandler = e =>
	{
		e.preventDefault();

		setMessage( <Working /> );

		if ( !handshakename || handshakename == "" || !valid( handshakename ) )
		{
			errorHandler();

		}
		else
		{
			rememberVisited( handshakename );

			try
			{
				v1( handshakename );
				
				setTimeout( () =>
				{
					setMessage( "Redirecting.." );
					
					setTimeout( () =>
					{
						setMessage( initialState );
						
					}, 2_000 );

				}, 3_000 );
	
			}
			catch( err )
			{
				console.log( err );

				errorHandler();

			}	
			
		}

		setTimeout( () => 
		{ 
			resetInput();

		}, 100 );

	}

	function resetInput()
	{
		document.getElementById( "handshakename" ).value = ``;
	}


	return (
		<>
			<form className={styles.resolver}>
				<svg height="15" viewBox="0 0 50 50" fill="#EEE" className={styles.icon}>
        			<path d="M38.8479955,15.3309324 L35.9273385,10.142414 L41.5857461,10.1440899 C41.7369154,10.1440899 41.9131403,10.2446425 41.9958241,10.3803887 C42.0860245,10.5287039 42.5453786,11.2862007 43.0974388,12.1962025 C43.7580735,13.2855233 44.5481626,14.5876805 45,15.3309324 L38.8479955,15.3309324 Z M28.3822383,46.7544839 C28.2452673,47 28.0673719,47 28.0097439,47 L25.6979399,47 C24.4743875,46.9991621 23.0629176,46.9983241 22.2227171,46.9983241 L31.2135301,30.8571047 C31.363029,30.5889642 31.3596882,30.2621679 31.204343,29.9973792 C31.0489978,29.7325905 30.7667038,29.5700303 30.4610245,29.5700303 L30.4601893,29.5700303 L15.136971,29.5901408 L12.0902004,24.3144767 L34.4089644,24.3144767 C34.4106347,24.3144767 34.4123051,24.3136388 34.4148107,24.3136388 C34.4173163,24.3136388 34.4189866,24.3144767 34.420657,24.3144767 C34.4331849,24.3144767 34.4448775,24.310287 34.4574053,24.3094491 C34.5075167,24.3060973 34.5576281,24.3010697 34.6052339,24.2893386 C34.6419822,24.2809592 34.6778953,24.269228 34.7138085,24.255821 C34.7330178,24.2482796 34.751392,24.2407381 34.7697661,24.2323587 C34.936804,24.1577821 35.0846325,24.035443 35.1790089,23.8619897 L38.8580178,17.0604386 L44.9315145,17.0604386 L28.3822383,46.7544839 Z M20.7252227,46.1411125 C20.5297884,45.8193439 20.2758909,45.4012123 19.9994432,44.9462114 C19.0698775,43.4119451 17.8788976,41.447816 17.7444321,41.2324657 C17.6993318,41.159565 17.6784521,40.9819219 17.7728285,40.8126582 C17.9883073,40.4255304 22.0573497,33.0960777 23.0487194,31.3095917 L28.9902561,31.3020503 L20.7252227,46.1411125 Z M10.592706,36.0397575 L7.63947661,30.7925833 L10.6160913,25.2127474 L13.6018931,30.3819932 C12.6739978,32.1290961 11.2257795,34.8540738 10.592706,36.0397575 Z M6.62889755,36.8567481 C5.12555679,36.8567481 3.63056793,36.8559101 3.41091314,36.8559101 L3.41007795,36.8559101 C3.26308463,36.8559101 3.08518931,36.7528436 3.00417595,36.6204493 L2.04287305,35.0359066 C1.35801782,33.9063648 0.4844098,32.4659476 0,31.6690676 L6.15200445,31.6690676 L9.07182628,36.857586 C8.43457684,36.857586 7.53257238,36.8567481 6.62889755,36.8567481 Z M16.6177617,0.246354074 C16.7547327,0 16.9317929,0 16.9894209,0 L22.8015033,0.000837939027 L13.7864699,16.1420574 C13.7789532,16.1554644 13.7747773,16.1697094 13.7680958,16.1839544 C13.7547327,16.2107684 13.7430401,16.2384204 13.7321826,16.2669103 C13.7229955,16.2945623 13.7146437,16.3213764 13.7071269,16.3490283 C13.7004454,16.3750045 13.6945991,16.4009806 13.6904232,16.4269567 C13.685412,16.4596363 13.6820713,16.491478 13.6812361,16.5233197 C13.6804009,16.5375646 13.6770601,16.5509717 13.6770601,16.5660546 C13.6770601,16.5769478 13.6795657,16.587003 13.6804009,16.5978962 C13.6812361,16.6297379 13.6845768,16.6607417 13.689588,16.6917454 C13.6929287,16.7177215 13.6971047,16.7436976 13.7037862,16.7696737 C13.7104677,16.7973257 13.7196548,16.8233018 13.7288419,16.8501159 C13.738029,16.876092 13.747216,16.902906 13.7589087,16.9280442 C13.7706013,16.9531824 13.7839644,16.9766447 13.7981626,17.0009449 C13.8123608,17.0244072 13.8257238,17.0478695 13.8424276,17.0704938 C13.8582962,17.0931182 13.8766704,17.1140667 13.8958797,17.1358531 C13.9142539,17.1559636 13.9326281,17.1769121 13.9526726,17.1961847 C13.9727171,17.2146194 13.9935969,17.2305402 14.0153118,17.247299 C14.0395323,17.2665716 14.0637528,17.2841683 14.0896437,17.3000891 C14.0996659,17.3059547 14.1071826,17.3134962 14.1172049,17.3193617 C14.1272272,17.3252273 14.1380846,17.3269032 14.1489421,17.3319308 C14.1932071,17.3545552 14.2399777,17.3738278 14.2892539,17.3889107 C14.3067929,17.3939383 14.3234967,17.4006418 14.3418708,17.4048315 C14.40451,17.4199144 14.4688196,17.4291318 14.5364699,17.4291318 C14.5373051,17.4291318 14.5373051,17.4299697 14.5381403,17.4299697 L14.5389755,17.4299697 L14.5398107,17.4299697 L14.9214922,17.4291318 C14.9231626,17.4291318 14.924833,17.4299697 14.9265033,17.4299697 L14.9273385,17.4299697 L29.8655345,17.4098592 C30.2605791,18.0969692 30.9988864,19.3899091 31.627784,20.490961 C32.1105234,21.3372794 32.5097439,22.0352826 32.8237751,22.5841326 L10.5943764,22.5841326 C10.5843541,22.5841326 10.575167,22.5874844 10.56598,22.5883223 C10.2636414,22.59335 9.97216036,22.7533963 9.81848552,23.0408094 L6.13864143,29.9387235 L0.0693207127,29.9387235 C2.7185412,25.1842574 16.4407016,0.563095026 16.6177617,0.246354074 Z M24.2873051,0.878998039 L24.8268374,1.76721341 C25.7747773,3.33080763 27.1135857,5.53793903 27.2555679,5.76753432 C27.3006682,5.84043502 27.3215479,6.01724015 27.2263363,6.18734177 L21.9504454,15.6904083 L16.0114143,15.6979497 L24.2873051,0.878998039 Z M34.4047884,10.9543769 L37.3596882,16.2040649 L34.3471604,21.7721697 C33.988029,21.1453913 33.5420379,20.3644322 33.123608,19.6312355 C32.2967706,18.1824389 31.6937639,17.1274737 31.3538419,16.5375646 C31.9961024,15.3619362 33.6940423,12.2515065 34.4047884,10.9543769 Z" />
				</svg>
				<input 
					className={styles.input}
					type="text" 
					id="handshakename"
					name="handshakename" 
					placeholder="Enter a handshake name (e.g. welcome.nb)" 
					onChange={e => setHandshakename( removeTrailingSlash( e.target.value ) )}
				/>
				<button 
					className={styles.submit} 
					onClick={e => submitHandler( e )}
				>
					→
				</button>
			</form>
			{message}
		</>
	);

}

export default Form;