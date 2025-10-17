import { createAuthPage } from "@/components/layout/page-factory";

export default createAuthPage({
  uri: "/sign-in",
  imageSrc: "/undraw_login_weas.svg",
  altText: "Login",
  placeholderText:
    "Clerk sign-in component will be implemented in future iterations",
});
