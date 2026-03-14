// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

// function Google() {

//   return (
//     <GoogleLogin
//       onSuccess={(credentialResponse) => {
//         const decoded = jwtDecode(credentialResponse.credential);
//         console.log(decoded);


//                 // Send token to backend for verification
//         onLogin(credentialResponse.credential);

//       }}
      
      

//       onError={() => {
//         console.log('Login Failed');
//       }}
//     />
//   );
// }

// export default Google;





// frontend/src/components/Google.jsx
import { GoogleLogin } from '@react-oauth/google';

function Google() {

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await fetch("http://localhost:3232/google-login", { // your backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("login", data.email);
        alert(`Login Successful! Welcome ${data.name}`);
        window.location.href = "/";
      } else {
        alert("Google login failed");
      }
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed, check console");
    }
  };

  const handleError = () => {
    alert('Login Failed');
    console.log('Login Failed');
  };

  return (



    
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}

export default Google;