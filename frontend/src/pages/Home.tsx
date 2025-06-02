import {Link} from 'react-router-dom';
import Page from "../components/Page.tsx";
import Hero from "../components/Hero.tsx";

const Home = () => {
    return (
        <Page>
            <Hero />
            <div className='container text-center p-5'>
                <h2 className='mb-5'>What we offer</h2>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm h-100">
                            <div className="card-header py-3"><h4 className="my-0 fw-normal">Tourism</h4></div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p>Discover the best attractions and hidden gems of Newcastle</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm h-100">
                            <div className="card-header py-3"><h4 className="my-0 fw-normal">Business Directory</h4></div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p>Connect with local businesses and services</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm h-100">
                            <div className="card-header py-3"><h4 className="my-0 fw-normal">Community</h4></div>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <p>Join events and connect with fellow Geordies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center p-5 bg-primary">
                <h2>Ready to Join Geordie Nation?</h2>
                <p>Create your account today and become part of our community</p>
                <Link to='register' className='btn btn-lg btn-light'>Sign up now</Link>
            </div>
        </Page>
    );
}

export default Home;