//ROLE SELECTION PAGE
// app/select-role/page.tsx
// ... import RoleSelection logic ...
import { useNavigate } from "react-router-dom";
export default function handleContinue(selectedRole) {
  const navigate = useNavigate();
  if (selectedRole === 'venue') {
    navigate('/vendor/onboard') // <-- Yahan Left Window wala form khulega
  } 
  else if (selectedRole === 'user') {
    navigate('/dashboard') 
  }
}