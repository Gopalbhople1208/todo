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




// // frontend/src/components/Google.jsx
// import { useGoogleLogin } from "@react-oauth/google";

// function Google() {
//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       const token = tokenResponse.credential;

//       try {
//         const res = await fetch("http://localhost:3232/google-login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token }),
//         });

//         const data = await res.json();

//         if (data.success) {
//           localStorage.setItem("login", data.email);
//           alert(`Login Successful! Welcome ${data.name}`);
//           window.location.href = "/";
//         } else {
//           alert("Google login failed");
//         }
//       } catch (err) {
//         console.error("Google login error:", err);
//         alert("Google login failed, check console");
//       }
//     },
//     onError: () => {
//       alert("Login Failed");
//     },
//   });

//   return (
//     <button
//       onClick={() => login()}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "10px",
//         padding: "5px 10px ",
//         width: "100%",
//         backgroundColor: "#fff",
//         border: "1px solid #ddd",
//         borderRadius: "6px",
//         cursor: "pointer",
//         fontWeight: "bold",
//         color:"black"
//       }}
//     >
//       <img
//         src="https://imgs.search.brave.com/4MBvClgfV5NmkmIofX1ubWajKvxAW1UEqTXj3cvUcMs/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/a2V5d2VvLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/OS9EaXNlbm8tc2lu/LXRpdHVsby05LnBu/Zw"
//         alt="Google"
//         style={{ width: "45px" }}
//       />
//       Sign in with Google
//     </button>
//   );
// }

// export default Google;





// // frontend/src/components/Google.jsx
// import { GoogleLogin } from "@react-oauth/google";

// function Google() {
//   const handleSuccess = async (credentialResponse) => {
//     const token = credentialResponse.credential; // ID token
//     if (!token) return alert("Google login failed: no token");

//     try {
//       const res = await fetch("http://localhost:3232/google-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem("login", data.email);
//         alert(`Login Successful! Welcome ${data.name}`);
//         window.location.href = "/";
//       } else {
//         alert("Google login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Google login failed, check console");
//     }
//   };

//   const handleError = () => {
//     alert("Login Failed");
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleSuccess}
//       onError={handleError}
//       render={(renderProps) => (
//         <button
//           onClick={renderProps.onClick}
//           disabled={renderProps.disabled}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "10px",
//             padding: "5px 10px",
//             width: "100%",
//             backgroundColor: "#fff",
//             border: "1px solid #ddd",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontWeight: "bold",
//             color: "black",
//           }}
//         >
//           <img
//             src="https://imgs.search.brave.com/4MBvClgfV5NmkmIofX1ubWajKvxAW1UEqTXj3cvUcMs/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/a2V5d2VvLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/OS9EaXNlbm8tc2lu/LXRpdHVsby05LnBu/Zw"
//             alt="Google"
//             style={{ width: "45px" }}
//           />
//           Sign in with Google
//         </button>
//       )}
//     />
//   );
// }

// export default Google;







import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

function Google() {

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) return alert("Google login failed: no token");

        // Decode to get user info
        const decoded = jwtDecode(token);

        try {
          const res = await fetch("/api/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          const data = await res.json();

          if (data.success) {
            localStorage.setItem("login", data.email);
            window.dispatchEvent(new Event("localStorage-change"));
            alert(`Login Successful! Welcome ${data.name}`);
            window.location.href = "/";
          } else {
            alert("Google login failed");
          }
        } catch (err) {
          console.error(err);
          alert("Google login failed, check console");
        }
      }}
      onError={() => alert("Login Failed")}
      // ✅ This shows the account picker like Image 1
      useOneTap
      auto_select={false}
      shape="rectangular"
      size="large"
      width="400"
      logo_alignment="left"
    />
  );
}

export default Google;