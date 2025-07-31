import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    const res = await fetch(
      "https://flipkart-backend-pcbu.onrender.com/auth/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Box className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Sign Up
        </h2>

        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {error && (
          <Box color="red" my={1}>
            {error}
          </Box>
        )}
        <Button
          onClick={handleSignup}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Box mt={2} textAlign="center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Login
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default Signup;
