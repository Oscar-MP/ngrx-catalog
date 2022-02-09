import { ICatalog } from "../shared/interfaces/ICatalog";

export const catalogs: ICatalog[] = [
    {
        id: 1,
        name: 'Skateboarding',
        description: 'This is the catalog for skateboarding. Made by skateboarders for skateboarders. Here you\'ll find the best offers for buying skate boards, wheels, etc...',
        image: 'assets/images/catalogs/skate.jpg',
        rating: 5
    },
    {
        id: 2,
        name: 'Surf',
        description: 'All kind of surf products, since tables to gums and many many more. Take a look',
        image: 'assets/images/catalogs/surf.jpg',
        rating: 3
    },
    {
        id: 3,
        name: 'Riding',
        description: `For the riding lovers!
        We have a huge catalog of bikes meant for downhill and BTT, very resistent and well made bikes that will help you enjoy your riding time. 
        Become a member of santa cruz partnership and get a 50% discount on this catalog. Remember to stay hungry!`,
        image: 'assets/images/catalogs/bike.jpg',
        rating: 4
    },
    {
        id: 4,
        name: 'Snowboarding',
        description: `We are in love with the snow, that's why we offer hundreds of snowboard items like boards, holdings, boots, fixings, etc... 
        Take a look at all the well known brands that are in our catalog and choose your best and most loved one!. Don't miss this oportunity to improve your snowboard skills with this high quality material`,
        image: 'assets/images/catalogs/snowboard.jpg',
        rating: 5
    },
    {
        id: 5,
        name: 'Skiing',
        description: `This catalog contains a huge list of ski products.
        Take a look at out catalog and choose the ski or material that fits best for you!.
        We hope you enjoy the winter with out products. Your feedback is appreciated`,
        image: 'assets/images/catalogs/esqui.jpg',
        rating: 4
    },
];