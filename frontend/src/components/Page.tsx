import NavBar from "./NavBar.tsx";

const Page = ({...props}) => {
    return (
        <div className=''>
            <NavBar />
            <main className=''>
                {props.children}
            </main>
        </div>
    );
}

export default Page;