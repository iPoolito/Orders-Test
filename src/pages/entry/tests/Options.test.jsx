import { render, screen } from '../../../test-utils/testing-lirbary-utils'
import Options from '../Options'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'

test('Displays image for each scoop option from server', async () => {
    render(<Options optionType='scoops' />)

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    //We are specting to have 2 images 
    expect(scoopImages).toHaveLength(2);
    //confirm alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('Display iomage for each tooping from server', async () => {
    render(<Options optionType='toppings' />, { wrapper: OrderDetailsProvider })

    const toopingimages = await screen.findAllByRole('img', { name: /tooping$/i })
    expect(toopingimages).toHaveLength(6);
    const altText = toopingimages.map((element) => element.alt)
    expect(altText).toEqual(['M&Ms tooping', 'Hot fudge tooping', 'Peanut butter cups tooping', 'Gummi bears tooping', 'Mochi tooping', 'Cherries tooping'])
})