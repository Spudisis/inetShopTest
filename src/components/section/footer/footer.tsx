import React from "react";
import s from "./footer.module.scss";
import phone from "../../../assets/footer/phone.svg";
import gazilov from "../../../assets/footer/gazilov.png";
import inst from "../../../assets/footer/inst.png";
import mail from "../../../assets/footer/mail.png";
import masterCard from "../../../assets/footer/masterCard.png";
import visa from "../../../assets/footer/visa.png";
import cursor from "../../../assets/footer/cursor.png";
const Footer = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.leftBlocks}>
          <div className={s.section}>
            <div className={s.twinBlock}>
              <div className={s.twinBlock__info}>
                <span>Ильинский онлайн</span>
                <ol>
                  <li>Кулинария</li>
                  <li>Супермаркет</li>
                  <li>Заморозка</li>
                  <li>Другое</li>
                </ol>
              </div>
              <div className={s.twinBlock__info}>
                <span>Ильинский клуб</span>
                <ol>
                  <li>Акции</li>
                  <li>Доставка и оплата</li>
                  <li>Программа лояльности</li>
                  <li>Политика конфиденциальности</li>
                  <li>Вакансии</li>
                </ol>
              </div>
            </div>
            <div className={s.bottom_info && s.firstInfoBot}>
              &copy; 2022 Ильинский онлайн - доставка товаров и продуктов на дом
            </div>
          </div>
          <div className={s.section}>
            <div className={s.secondBlockInfo}>
              <div className={s.locationInfo}>
                <div className={s.locationInfo__phone}>
                  <img src={phone} alt="phone" /> +7 930 583 81 11
                </div>
                <div className={s.locationInfo__time}>Ежедневно с 09:00 до 21:00</div>
              </div>
              <ol className={s.media}>
                <li>
                  <img src={cursor} className={s.media__cursor} alt="cursor" /> Адреса магазинов
                </li>
                <li>
                  <img src={inst} className={s.media__inst} alt="inst" />
                  Следите за нами
                </li>
                <li>
                  <img src={mail} className={s.media__mail} alt="mail" />
                  Обратная связь
                </li>
              </ol>
            </div>
            <div className={s.bottom_info}>Информация на сайте не является публичной офертой</div>
          </div>
        </div>
        <div className={s.section && s.lastBlock}>
          <div className={s.subscribe}>
            <p>Подпишитесь на вкусные и полезные новости</p>
            <div className={s.subscribe__buttons}>
              <input type="email" />
              <button>Подписаться</button>
            </div>
            <div className={s.subscribe__acceptSubcsribe}>
              <input type="checkbox" id="confidence" />
              <label htmlFor="confidence">Согласен с политикой конфиденциальности</label>
            </div>
          </div>
          <div className={s.bottom}>
            <div>
              <img src={visa} alt="visa" />
            </div>
            <div>
              <img src={masterCard} alt="mastercard" />{" "}
            </div>
            <div>
              Разработано в <img src={gazilov} alt="gazilov" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
