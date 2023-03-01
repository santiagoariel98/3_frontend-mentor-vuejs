<template>
  <img class="fixed -z-10" src="./images/bg-main-desktop.png" alt="bg-main" width="483" height="900" />
  <main class="min-h-screen flex items-center justify-center text-lg font-['Space_Grotesk'] gap-32">
    <div class="flex flex-col gap-10 text-white max-w-[34rem] w-full -ml-16">
      <section class="card card-front flex flex-col p-8 pb-6 text-[var(--light-grayish-violet)]">
        <div class="flex-1">
          <img src="./images/card-logo.svg" alt="card logo" />
        </div>
        <div class="flex-1">
          <div class="flex flex-col h-full justify-between pt-4">
            <input
              class="placeholder:text-inherit bg-transparent text-[1.75rem] tracking-[0.215rem]"
              type="text"
              placeholder="0000 0000 0000 0000"
              :value="card.ccn"
              disabled
            />
            <div class="flex justify-between text-sm tracking-[0.15em]">
              <h1 class="uppercase">{{ card.cardholder_name.length ? card.cardholder_name : "Jane Appleseed" }}</h1>
              <p>
                <span> {{ card.month.length ? card.month : "00" }}</span
                >/<span> {{ card.year.length ? card.year : "00" }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="card card-back flex items-center justify-center p-14 pb-16 self-end">
        <div class="w-full">
          <p class="placeholder:text-inherit bg-transparent tracking-widest text-end text-sm w-full">
            {{ card.cvc.length ? card.cvc : "000" }}
          </p>
        </div>
      </section>
    </div>
    <form class="max-w-sm w-full flex flex-col gap-7" @submit.prevent="onSubmit">
      <div>
        <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]" for="cardholder_name"
          >Cardholder Name</label
        >
        <input
          class="appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none"
          id="cardholder_name"
          name="cardholder_name"
          type="text"
          placeholder="e.g. Jane Appleseed"
          maxlength="23"
          v-model="card.cardholder_name"
        />
      </div>
      <div>
        <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]" for="card_number">Card Number</label>
        <input
          @input="onChange"
          v-model="card.ccn"
          class="appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none"
          id="card_number"
          name="card_number"
          placeholder="e.g. 1234 5678 9123 0000"
          :aria-errormessage="errors.ccn.length ? errors.ccn : undefined"
        />
        <span v-if="errors.ccn.length" class="text-xs text-[var(--red)] tracking-[0.01em]">
          {{ errors.ccn }}
        </span>
      </div>
      <div class="flex gap-6">
        <div class="flex-[0.9]">
          <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]">Exp. Date (MM/YY)</label>
          <div class="flex gap-2">
            <input
              v-model="card.month"
              class="appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none"
              id="month"
              name="month"
              type="text"
              placeholder="MM"
              maxlength="2"
              :aria-errormessage="errors.month.length ? errors.month : undefined"
            />
            <input
              v-model="card.year"
              class="appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none"
              id="year"
              name="year"
              type="text"
              placeholder="YY"
              maxlength="2"
              :aria-errormessage="errors.year.length ? errors.year : undefined"
            />
          </div>
          <p v-if="errors.year.length" class="text-xs text-[var(--red)] tracking-[0.01em]">
            {{ errors.year }}
          </p>
          <p v-if="errors.month.length" class="text-xs text-[var(--red)] tracking-[0.01em]">
            {{ errors.month }}
          </p>
        </div>
        <div class="flex-1">
          <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]" for="cvc">CVC</label>
          <input
            v-model="card.cvc"
            :class="`appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none  `"
            id="cvc"
            name="cvc"
            type="text"
            maxlength="3"
            :aria-errormessage="errors.cvc.length ? errors.cvc : undefined"
            placeholder="e.g. 123"
          />
          <span v-if="errors.cvc.length" class="text-xs text-[var(--red)] tracking-[0.01em]">
            {{ errors.cvc }}
          </span>
        </div>
      </div>
      <button class="w-full p-3 rounded-xl-lg bg-[var(--very-dark-violet)] rounded-xl">
        <span class="text-[var(--light-grayish-violet)]">Confirm</span>
      </button>
    </form>
    <!-- Thank you! We've added your card details Continue -->
  </main>
  <!-- <img class="absolute top-0 left-0 w-screen h-screen opacity-50" src="./design/active-states.jpg" /> -->
</template>

<script setup>
import { ref } from "vue";
const msg = {
  EMPTY: "Can't be blank",
  WRONG_FORMAT: "Wrong format, numbers only",
};

const card = ref({
  cardholder_name: "",
  ccn: "",
  cvc: "",
  year: "",
  month: "",
});

const errors = ref({
  ccn: "",
  cvc: "",
  year: "",
  month: "",
});

const onChange = (ev) => {
  card.value.ccn = ev.target.value
    .replace(/[^\w]/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
};
const onSubmit = () => {
  valid();
};

const valid = () => {
  let ccn = card.value.ccn.split(" ").join("");
  errors.value.ccn = !ccn.length ? msg.EMPTY : isNaN(Number(ccn)) ? msg.WRONG_FORMAT : "";
  errors.value.year = !card.value.year.length ? msg.EMPTY : isNaN(Number(card.value.year)) ? msg.WRONG_FORMAT : "";
  errors.value.month = !card.value.month.length ? msg.EMPTY : isNaN(Number(card.value.month)) ? msg.WRONG_FORMAT : "";
  errors.value.cvc = !card.value.cvc.length ? msg.EMPTY : isNaN(Number(card.value.cvc)) ? msg.WRONG_FORMAT : "";
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap");
* {
  --linear-gradient: hsl(249, 99%, 64%) to hsl(278, 94%, 30%); /*  (active input border) */
  --red: hsl(0, 100%, 66%); /* (input errors) */
  /* Neutral */
  --light-grayish-violet: hsl(270, 3%, 87%);
  --dark-grayish-violet: hsl(279, 6%, 55%);
  --very-dark-violet: hsl(278, 68%, 11%);
}
.card {
  width: 447px;
  height: 245px;
}
.card-front {
  background-image: url(images/bg-card-front.png);
}
.card-back {
  background-image: url(images/bg-card-back.png);
}
input:focus {
  border-color: var(--linear-gradient);
}
input[aria-errormessage] {
  border-color: var(--red) !important;
}
input::placeholder {
  color: var(--dark-grayish-violet);
}
</style>
