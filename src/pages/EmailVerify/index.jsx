import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import success from "../images/success.png";
import styles from "./styles.module.css";
import { baseUrl } from "../../baseUrl";


const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	
	const verifyEmailUrl = useCallback (async () => {
		try {
			const url = `${baseUrl}/auth/user/${param.id}/verify/${param.token}`;
			const result = await fetch(url);
			const jsonData= await result.json();
			console.log(jsonData);
			setValidUrl(true);
		} catch (error) {
			console.log(error);
			setValidUrl(false);
		}
	},[]);

	useEffect(()=>{
		verifyEmailUrl();
	},[param]);
   

	return (
		<>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default EmailVerify;
