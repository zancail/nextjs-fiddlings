import Link from "next/link";
import { LoginButton } from "./login-button";

const Header = (): JSX.Element => {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    href={"/"}
                                    className="nav-link active"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={"/menu"} className="nav-link">
                                    Menu
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <LoginButton />
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
