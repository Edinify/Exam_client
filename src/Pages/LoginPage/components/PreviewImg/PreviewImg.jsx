import LoginLogo from "../../../../assets/images/login-imgs/oxford-logo.png";
import LoginMobileLogo from "../../../../assets/images/login-imgs/oxford-mobile-icon.png"

const PreviewImg = () => {
  return (
    <div className="login-left">
      <div className="left-container">
        <p>
          İstənilən cihazda <br />
          Hər zaman yanınızda!
        </p>
        <div className="left-img-container">
         <img src={LoginLogo} alt="logo" className="desktop-logo" />
         <img src={LoginMobileLogo} alt="" className="mobile-logo" />
        </div>
      </div>
    </div>
  );
};

export default PreviewImg;
