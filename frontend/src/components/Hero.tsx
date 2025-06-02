import {Link} from 'react-router-dom';

const Hero = () => {
    return (
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
            <div className="col-md-6 p-lg-5 mx-auto my-5"><h1 className="display-3 fw-bold">Welcome to Geordie Nation</h1>
                <h3 className="fw-normal text-muted mb-3">Your gateway to Newcastle upon Tyne's vibrant community</h3>
                <div className="d-flex gap-3 justify-content-center lead fw-normal">
                    <Link className='btn btn-lg btn-primary' to='register'>Join Our Community</Link>
                </div>
            </div>
            <div className="product-device shadow-sm d-none d-md-block"></div>
            <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
    );
}

export default Hero;