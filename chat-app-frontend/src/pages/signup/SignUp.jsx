import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox.jsx";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {

	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: ""
	});

	const {loading, signup} = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> Raven</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>First Name</span>
						</label>
						<input 
							type='text' 
							placeholder='John' 
							className='w-full input input-bordered  h-10' 
							value={inputs.firstName}
							onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
						/>
					</div>
            		<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Last Name</span>
						</label>
						<input 
							type='text' 
							placeholder='Doe' 
							className='w-full input input-bordered  h-10' 
							value={inputs.lastName}
							onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
						/>
					</div>
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input 
							type='text' 
							placeholder='johndoe' 
							className='w-full input input-bordered h-10' 
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;