export default function GoogleLoginButton() {
  return (
    <button
      onClick={() =>
        (window.location.href =
          "http://localhost:3000/api/auth/google")
      }
      className="w-full border py-2 rounded flex justify-center text-sm"
    >
      Continue with Google
    </button>
  );
}
