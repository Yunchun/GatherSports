import Title from 'components/landing/Title';
import TeamCard from 'components/landing/TeamCard';
import Image1 from 'assets/img/durant.jpg';
import Image2 from 'assets/img/Ronaldo.jpg';
import Image3 from 'assets/img/malong.jpg';
import Image4 from 'assets/img/phelps.jpg';

export default function TeamSection() {
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-7xl mx-auto px-4">
                <Title heading="Here are the most popular courses">
                    Enroll in Courses on GatherSport Illinois. enjoy professional training, 
                    improve your sports skills
                    and become the most dazzling star on the court!
                </Title>
                <div className="flex flex-wrap">
                    <TeamCard
                        img={Image1}
                        name="Kevin Durant"
                        position="Three-Pointer Training"
                    />
                    <TeamCard
                        img={Image2}
                        name="C. Ronaldo"
                        position="Introduction To Soccer"
                    />
                    <TeamCard
                        img={Image3}
                        name="Long Ma"
                        position="Advanced Table Tennis"
                    />
                    <TeamCard
                        img={Image4}
                        name="Micheal Phelps"
                        position="Freestyle Swimming"
                    />
                </div>
            </div>
        </section>
    );
}
