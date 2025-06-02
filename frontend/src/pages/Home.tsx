import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Homepage</h1>
            <Link to='register'>Register</Link>
        </>
    );
}

export default Home;