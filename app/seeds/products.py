from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    nike_product_1 = Product(
        owner_id=1, product_name='Nike Sportswear Club Fleece Women\'s Oversized Crop Graphic Hoodie', price=70.00, brand='Nike', stock_quantity=50, description='Club Fleece sweatshirts, universally loved for their coziness and consistency, are for everyone. Always soft and made with a relaxed fit, they’re basics that help you do more. Cropped to meet your favorite high-waisted pants, this spacious hoodie is perfect for colder days that call for a little extra style.')
    nike_product_2 = Product(
        owner_id=1, product_name='Nike Women\'s Sneaker Running Shoes', price=122.00, brand='Nike', stock_quantity=100, description='Women\'s running shoes from Nike.')
    nike_product_3 = Product(
        owner_id=1, product_name='Nike Women\'s NSW Tight Fleece Varsity', price=50.00, brand='Nike', stock_quantity=5, description='The semi-brushed fleece fabric has a soft, lightweight feel perfect for everyday wear')
    nike_product_4 = Product(
        owner_id=1, product_name='Nike Tech Hip Pack', price=58.00, brand='Nike', stock_quantity=50, description='The Nike Tech Hip Pack lets you easily access and carry your gear. It features 2 zippered pockets to store your stuff and an adjustable strap allowing you to customize your fit.'
    )
    nike_product_5 = Product(
        owner_id=1, product_name='Nike Legacy 91 Tech Swoosh Hat', price=32.30, brand='Nike', stock_quantity=400, description='CLASSIC COMFORT. The Nike Dri-FIT Legacy91 Hat is a comfortable course staple with a metal buckle closure and a soft sweatband. This product is made with at least 50% recycled polyester fibers. Benefits Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable. Sweatband is soft and absorbent. Adjustable closure lets you personalize your fit.'
    )
    ##############################################################################
    adidas_product_1 = Product(
        owner_id = 2, product_name = 'adidas Women\'s Puremotion Adapt Running Shoe', price=56.00, brand='Adidas', stock_quantity=1000, description='Built for running. Revitalized for style. Sharp and simple, meet clean and laceless. Cut what\'s unnecessary, keep the attitude.'
    )
    adidas_product_2 = Product(
        owner_id = 2, product_name = 'adidas Originals National Sling Backpack, Black, One Size', price=60.00, brand='Adidas', stock_quantity=600, description='Whatever your plans, this understated adidas sling backpack is ready to go with you. Lightweight yet sturdy, it can handle a few bumps. Multiple zip pockets help you keep track of small items like your earbuds and phone charger when you\'re on the move.'
    )
    adidas_product_3 = Product(
        owner_id = 2, product_name = 'adidas Originals Women\'s Trefoil Beanie', price=9.73, brand='Adidas', stock_quantity=40, description='Stay warm and look cool in this adidas originals beanie. soft flat knit construction features a fold-up brim so you can personalize your look. a bold embroidered trefoil logo on the front lets you represent with pride.'
    )
    adidas_product_4 = Product(
        owner_id = 2, product_name = 'adidas Originals Unisex-Child Trefoil Crew', price=21.95, brand='Adidas', stock_quantity=90, description='Timeless adidas style inspires this juniors\' sweatshirt. It features an oversize contrast Trefoil logo for an authentic look. Drop shoulders give it a modern vibe. This comfy pullover is made of plush French terry for a soft feel.'
    )
    ##############################################################################
    cleaning_products_1 = Product(
        owner_id = 3, product_name = 'Mrs. Meyer\'s All-Purpose Cleaner Spray, Lemon Verbena, 16 fl. oz - Pack of 3', price = '13.91', brand='Mrs. Meyer\'s', stock_quantity = 40, description = 'Mrs. Meyer\'s Clean Day Multi-Surface Everyday Cleaners feature hard-working yet gentle multi purpose cleaning agents, while also providing a special, singular scent for your entire home. Lemon verbena has a light, refreshingly mild citrus scent. This tender herb blossoms in early summer and smells bright and new through and through'
    )
    cleaning_products_2 = Product(
        owner_id = 3, product_name = 'Mr. Clean Magic Eraser, Bathroom, Shower, and Shoe Cleaner with Febreze Lavender Scent, Cleaning Pads with Durafoam, 10 Count', price = '12.58', brand = 'Mr. Clear', stock_quantity = 1000, description = 'Mr. Clean MAGIC Eraser bath Scrubber cleaning pads with Febreze Lavender scent erases 3x more Soap scum. The build-up of tough soap scum on your sink, shower, and tub can quickly transform your bathroom from shiny and clean to dingy and grimy. The cleaning Scrubber is more durable than Mr. Clean MAGIC Eraser original allowing you to tackle your tough bathroom messes easily. Vs. The leading all-purpose Spray Cleaner.'
    )
    cleaning_products_3 = Product(
        owner_id = 3, product_name = 'Stardrops - The Pink Stuff - The Miracle All Purpose Cleaning Paste', price = '5.67', brand = 'The Pink Stuff', stock_quantity = 60, description = 'The Pink Stuff Miracle Cleaning Paste is perfect for cleaning dirt, grime and stains on saucepans, cooker tops, sinks, uPVC, barbecues, ceramic tiles, glass, showers, garden furniture, paintwork, boats, brass and rust... the list is endless.'
    )
    cleaning_products_4 = Product(
        owner_id = 3, product_name = 'HOMEXCEL Microfiber Cleaning Cloth,12 Pack Cleaning Rag,Cleaning Towels with 4 Color Assorted,11.5"X11.5"(Green/Blue/Yellow/Pink)', price = '8.99', brand = 'Cloths inc.', stock_quantity = 100, description = 'We created Compact by Design to identify products that, while they may not always look very different, have a more efficient design. With the removal of excess air and water, products require less packaging and become more efficient to ship. At scale, these small differences in product size and weight lead to significant carbon emission reductions.'
    )

    ##############################################################################
    zelda_product_1 = Product(
        owner_id = 2, product_name = 'The Legend of Zelda: Breath of the Wild - Nintendo Switch', price=53.85, brand='Nintendo', stock_quantity=100, description='Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series.'
    )
    zelda_product_2 = Product(
        owner_id = 2, product_name = 'HORI Wireless HORIPAD (The Legend of Zelda Edition) Pro Controller with Motion Control for Nintendo Switch - Officially Licensed by Nintendo', price=59.99, brand='Nintendo', stock_quantity=600, description='Lightweight yet solid, the snappy and responsive wireless HORIPAD is equipped with an accelerometer and gyroscope for full motion control, making it the go-to choice for Nintendo Switch gamers. Charges with included USB-C cable. Featuring Link character art. Officially Licensed by Nintendo.'
    )
    zelda_product_3 = Product(
        owner_id = 2, product_name = 'Controller Gear Legend of Zelda pint Glasses 16 oz - Calamity Ganon and Link, Set of 2 - Official Nintendo Product - Not Machine Specific, Clear (DW16OZGL-2PECL)', price=12.99, brand='Nintendo', stock_quantity=40, description='Enjoy your drinks while sporting your favorite video game character. Set includes 2 pint glasses made from Premium Glass material, our glasses are lead and bpa free. Hand wash recommended.'
    )
    zelda_product_4 = Product(
        owner_id = 2, product_name = 'The Legend of Zelda: Tears of the Kingdom - Nintendo Switch (US Version)', price=57.18, brand='Nintendo', stock_quantity=90, description='An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda™: Tears of the Kingdom for Nintendo Switch. The adventure is yours to create in a world fueled by your imagination.'
    )
    ##############################################################################



    db.session.add(nike_product_1)
    db.session.add(nike_product_2)
    db.session.add(nike_product_3)
    db.session.add(nike_product_4)
    db.session.add(nike_product_5)

    db.session.add(adidas_product_1)
    db.session.add(adidas_product_2)
    db.session.add(adidas_product_3)
    db.session.add(adidas_product_4)

    db.session.add(cleaning_products_1)
    db.session.add(cleaning_products_2)
    db.session.add(cleaning_products_3)
    db.session.add(cleaning_products_4)

    db.session.add(zelda_product_1)
    db.session.add(zelda_product_2)
    db.session.add(zelda_product_3)
    db.session.add(zelda_product_4)


    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(nike_product_1)
        db.session.delete(nike_product_2)
        db.session.delete(nike_product_3)
        db.session.delete(nike_product_4)
        db.session.delete(nike_product_5)

        db.session.delete(adidas_product_1)
        db.session.delete(adidas_product_2)
        db.session.delete(adidas_product_3)
        db.session.delete(adidas_product_4)

        db.session.delete(cleaning_products_1)
        db.session.delete(cleaning_products_2)
        db.session.delete(cleaning_products_3)
        db.session.delete(cleaning_products_4)

        db.session.delete(zelda_product_1)
        db.session.delete(zelda_product_2)
        db.session.delete(zelda_product_3)
        db.session.delete(zelda_product_4)

        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
