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