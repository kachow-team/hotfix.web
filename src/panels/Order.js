import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import edit from '../img/edit.svg';
import './place.css';


const Order = ({match: {params: {areaId, itemId}}, history, foodAreas, order, setActiveOrder}) => {
    const area = foodAreas.filter(area => area.id === areaId)[0];
    const item = area.items.filter(item => item.id === itemId)[0];

    const successPage = (
        <div className="Place Place_order">
            <header className="Place__header">
                <aside className="Place__trz">
                    <h1 className="Place__head">
                        <Link to="/" className="Place__logo">
                            {area.name}
                        </Link>
                    </h1>
                    <Link to="/edit" className="Place__change-tz">
                        <img
                            alt="change-profile"
                            src={edit}
                        />
                    </Link>
                </aside>
            </header>
            <aside className="Place__restoraunt">
                <img
                    className="Place__restoraunt-logo"
                    alt="Fastfood logo"
                    src={item.image}
                />
                <h2
                    className="Place__restoraunt-name"
                >
                    {item.name}
                </h2>
                <p className="Place__restoraunt-type">
                    {item.description}
                </p>
            </aside>
            <div className="Place__order-body">
                <h3 className="Place__order-number-header">
                    Номер вашего заказа
                </h3>
                <main className="Place__order-number">
                    7
                </main>
                <p className="Place__order-number-header">
                    Заказ будет готов через
                </p>
                <h3 className="Place__order-time">
                    ~ 15 минут
                </h3>
            </div>
            <footer className="Place__footer">
                <div
                    to="/orders"
                    className="Place__order"
                    onClick={() => {
                        setActiveOrder({itemId});

                        setTimeout(() => {
                            history.push('/orders');
                        }, 0);
                    }}
                >
                    Мои заказы
                </div>
            </footer>
        </div>
    );

    const failPage = (
        <div className="Place Place_order">
            <header className="Place__header">
                <aside className="Place__trz">
                    <h1 className="Place__head">
                        <Link to="/" className="Place__logo">
                            {area.name}
                        </Link>
                    </h1>
                    <Link to="/edit" className="Place__change-tz">
                        <img
                            alt="change-profile"
                            src={edit}
                        />
                    </Link>
                </aside>
            </header>
            <div className="Place__order-body">
                <h3 className="Place__order-number-header">
                    Сначала необходимо наполнить корзину
                </h3>
            </div>
        </div>
    );


    // Проверяем есть ли в корзине меню этого ресторана
    let isFoodFromCurrentRestInBucket = false;

    let bucketArary = Object.keys(order);

    foodAreas.forEach((area) => {
        area.items.forEach(item => {
            if (item.id === itemId) {
                item.foods.forEach(food => {
                    console.log(food);
                    if (bucketArary.includes(food.id)) {
                        isFoodFromCurrentRestInBucket = true;
                    }
                })
            }
        })
    });

    return isFoodFromCurrentRestInBucket ? successPage : failPage;
};

Order.defaultProps = {
    setActiveOrder: () => {
    },
};

export default withRouter(Order);
