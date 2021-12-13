import GatherSportNav from 'components/GatherSportNav.js';
import Content from 'components/profile/Content';

export default function Profile(info) {
    return (
        <>
            <GatherSportNav userid={info.location.state.userid}/>
            <main>
                <Content userid={info.location.state.userid}/>
            </main>
        </>
    );
}