<script>
export default {
    name: "AboutComponent",
    data() {
        return {
            members: [
                {
                    name: "Carmine Marchesani",
                    matricola: "Matricola: 113916",
                    //bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra eros nec eros hendrerit, eu faucibus sapien rhoncus. Maecenas sodales euismod ipsum ut maximus."
                },
                {
                    name: "Patryk Bialowas",
                    matricola: "Matricola: 113959",
                    //bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra eros nec eros hendrerit, eu faucibus sapien rhoncus. Maecenas sodales euismod ipsum ut maximus."
                },
                {
                    name: "Marco Cocilva",
                    matricola: "Matricola: 113965",
                    //bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra eros nec eros hendrerit, eu faucibus sapien rhoncus. Maecenas sodales euismod ipsum ut maximus."
                }
            ]
        };

    }
};
</script>

<template>
    <div class="about">
        <div class="hero-image animate__animated animate__fadeIn">
            <div class="hero-text">
<!--                <h1 class="animate__animated animate__fadeInUp">About Us</h1>-->
<!--                <p class="animate__animated animate__fadeInUp animate__delay-3s">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>-->
            </div>
        </div>
        <div class="members">
            <h2 class="animate__animated animate__fadeInUp animate__delay-1s">Our Team</h2>
            <div class="member animate__animated animate__fadeInUp animate__delay-2s" v-for="(member, index) in members" :key="index">
               <!--<img :src="member.image"> :alt="member.name"> -->
                <div class="member-info">
                    <h3>{{ member.name }}</h3>
                    <p>{{ member.matricola }}</p>
                    <p>{{ member.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.hero-image {
    background-image: url('https://picsum.photos/1600/900');
    //height: 100h; /* Altezza fissa del contenitore */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.hero-text {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
}

.hero-text h1 {
    font-size: 6rem;
}

.hero-text p {
    font-size: 2rem;
}

.members {
    margin-top: 3rem;
}

.member {
    display: flex;
    margin-top: 3rem;
}

.member img {
    width: 200px;
    height: 200px;
    margin-right: 2rem;
    object-fit: cover;
    border-radius: 50%;
}

.member h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.member p {
    margin-bottom: 0.5rem;
}

@media screen and (max-width: 768px) {
    .hero-text h1 {
        font-size: 4rem;
    }

    .hero-text p {
        font-size: 1.5rem;
    }
}
</style>






















