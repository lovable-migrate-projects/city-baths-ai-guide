import { createFileRoute, Link } from "@tanstack/react-router";
import styled from "styled-components";
import { useState } from "react";
import { PageShell } from "../../components/layout/PageShell";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/companies/create")({
  head: () => ({
    meta: [
      { title: "Разместить заведение — Городские бани" },
      { name: "description", content: "Бесплатно добавьте баню или сауну в крупнейший каталог России." },
    ],
  }),
  component: CreatePage,
});

const Layout = styled.div`
  display: grid; gap: 24px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1.4fr 1fr;
  }
`;

const Form = styled.form`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px;
  display: flex; flex-direction: column; gap: 16px;
`;

const Field = styled.label`
  display: flex; flex-direction: column; gap: 6px;
  font-size: 14px; font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  span.req { color: ${({ theme }) => theme.colors.primary}; }
  input, textarea, select {
    font-family: inherit;
    font-size: 15px;
    font-weight: 400;
    padding: 11px 14px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    &:focus { outline: none; border-color: ${({ theme }) => theme.colors.primary}; background: white; }
  }
  textarea { min-height: 100px; resize: vertical; }
`;

const Row = styled.div`
  display: grid; gap: 16px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.bp.sm}) { grid-template-columns: 1fr 1fr; }
`;

const Submit = styled.button`
  margin-top: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: 0;
  padding: 14px 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
`;

const Aside = styled.aside`
  display: flex; flex-direction: column; gap: 14px;
`;

const Benefits = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, white);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 22px;
  h3 { font-size: 18px; margin-bottom: 12px; }
  ul { display: flex; flex-direction: column; gap: 10px; }
  li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: ${({ theme }) => theme.colors.textSoft}; }
  svg { color: ${({ theme }) => theme.colors.primary}; flex-shrink: 0; margin-top: 2px; }
`;

const Success = styled.div`
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 32px;
  text-align: center;
  h2 { color: ${({ theme }) => theme.colors.success}; }
`;

function CreatePage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <PageShell title="Заявка принята" subtitle="Мы свяжемся с вами в течение рабочего дня.">
        <Success>
          <h2>Спасибо! 🎉</h2>
          <p>Ваше заведение скоро появится в каталоге после модерации.</p>
          <Link to="/">← Вернуться на главную</Link>
        </Success>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Разместить заведение"
      subtitle="Заполните форму — модератор проверит данные и опубликует карточку в течение суток."
    >
      <Layout>
        <Form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <Field>
            Название заведения <span className="req">*</span>
            <input required type="text" placeholder="Например, Сандуновские бани" />
          </Field>
          <Row>
            <Field>
              Город <span className="req">*</span>
              <input required type="text" placeholder="Москва" />
            </Field>
            <Field>
              Телефон <span className="req">*</span>
              <input required type="tel" placeholder="+7 (___) ___-__-__" />
            </Field>
          </Row>
          <Field>
            Адрес <span className="req">*</span>
            <input required type="text" placeholder="Улица, дом, корпус" />
          </Field>
          <Row>
            <Field>
              Часы работы
              <input type="text" placeholder="10:00 – 23:00" />
            </Field>
            <Field>
              Цена от, ₽/час
              <input type="number" min="0" placeholder="1500" />
            </Field>
          </Row>
          <Field>
            Тип заведения
            <select>
              <option>Общественная баня</option>
              <option>Частная сауна</option>
              <option>СПА-комплекс</option>
              <option>База отдыха</option>
            </select>
          </Field>
          <Field>
            Описание
            <textarea placeholder="Расскажите об услугах, особенностях парной, оборудовании..." />
          </Field>
          <Row>
            <Field>
              Контактное лицо <span className="req">*</span>
              <input required type="text" placeholder="Имя" />
            </Field>
            <Field>
              Email <span className="req">*</span>
              <input required type="email" placeholder="you@example.com" />
            </Field>
          </Row>
          <Submit type="submit">Отправить заявку <ArrowRight size={16} /></Submit>
        </Form>

        <Aside>
          <Benefits>
            <h3>Что вы получите</h3>
            <ul>
              <li><Check size={18} /> Бесплатное размещение в крупнейшем каталоге бань России</li>
              <li><Check size={18} /> Подробная карточка с фото, ценами и услугами</li>
              <li><Check size={18} /> Отзывы от реальных посетителей</li>
              <li><Check size={18} /> Размещение на интерактивной карте</li>
              <li><Check size={18} /> Рекомендации в ИИ-помощнике</li>
              <li><Check size={18} /> Аналитика просмотров и обращений</li>
            </ul>
          </Benefits>
        </Aside>
      </Layout>
    </PageShell>
  );
}
