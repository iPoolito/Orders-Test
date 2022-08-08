import { render, screen } from '@testing-library/react'
import Options from '../Options'

test('Displays image for each scoop otion from server', async () => {
    render(<Options optionType='scoops' />)

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    //We are specting to have 2 images 
    expect(scoopImages).toHaveLength(2);

    //confirm alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('Display image for each tooping option from server', async () => {
    render(<Options optionType='toopings' />)
    const toopingImage = await screen.findAllByRole('img', { name: /tooping$/i })
    expect(toopingImage).toHaveLength(3)
    const altText = toopingImage.map((element) => element.alt)
    expect(altText).toEqual(['Cherries tooping', 'M&Ms tooping', 'Hot fudge tooping'])
})