<template>
  <img class="fixed -z-10" src="./images/bg-main-desktop.png" alt="bg-main" width="483" height="900" />
  <main class="min-h-screen flex items-center justify-center text-lg font-['Space_Grotesk'] gap-32">
    <div class="flex flex-col gap-10 text-white max-w-[34rem] w-full -ml-16">
      <section class="card card-front flex flex-col p-8 pb-6">
        <div class="flex-1">
          <img src="./images/card-logo.svg" alt="card logo" />
        </div>
        <div class="flex-1">
          <div class="flex flex-col h-full justify-between pt-4">
            <input
              class="placeholder:text-inherit bg-transparent text-[1.75rem] tracking-[0.215rem]"
              type="text"
              placeholder="0000 0000 0000 0000"
              disabled
            />
            <div class="flex justify-between text-sm tracking-[0.15em]">
              <h1 class="uppercase">{{ this.cardholder_name || "Jane Appleseed" }}</h1>
              <p>
                <span>{{ this.month.length ? this.month : "00" }}</span
                >/<span>{{ this.year.length ? this.year : "00" }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="card card-back flex items-center justify-center p-14 pb-16 self-end">
        <div class="w-full">
          <input
            class="placeholder:text-inherit bg-transparent tracking-widest text-end text-sm w-full"
            type="text"
            placeholder="000"
            v-model="cvc"
          />
        </div>
      </section>
    </div>
    <form class="max-w-sm w-full flex flex-col gap-7" @submit.prevent="">
      <div>
        <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]" for="cardholder_name"
          >Cardholder Name</label
        >
        <input
          class="appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cardholder_name"
          name="cardholder_name"
          type="text"
          placeholder="e.g. Jane Appleseed"
          @input="onChange"
        />
      </div>
      <div>
        <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]" for="card_number">Card Number</label>
        <input
          class="appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="card_number"
          name="card_number"
          type="text"
          placeholder="e.g. 1234 5678 9123 0000"
        />
      </div>
      <div class="flex gap-6">
        <div class="flex-[0.9]">
          <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]">Exp. Date (MM/YY)</label>
          <div class="flex gap-2">
            <input
              class="appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="month"
              name="month"
              type="text"
              placeholder="MM"
              maxlength="2"
              @input="onChange"
            />
            <input
              class="appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="year"
              name="year"
              type="text"
              placeholder="YY"
              maxlength="2"
              @input="onChange"
            />
          </div>
        </div>
        <div class="flex-1">
          <label class="block text-xs font-bold mb-2 uppercase tracking-[0.165em]" for="cvc">CVC</label>
          <input
            class="appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cvc"
            name="cvc"
            type="text"
            maxlength="3"
            placeholder="e.g. 123"
            @input="onChange"
          />
        </div>
      </div>
      <button class="w-full p-3 rounded-lg bg-[var(--very-dark-violet)]">
        <span class="text-white">Confirm</span>
      </button>
    </form>
    <!-- Thank you! We've added your card details Continue -->
  </main>
  <!-- <img class="absolute top-0 left-0 w-screen h-screen opacity-50" src="./design/desktop-design.jpg" /> -->
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      cardholder_name: "",
      card_number: "",
      month: "",
      year: "",
      cvc: "",
      default_card_number: "0000 0000 0000",
    };
  },
  methods: {
    onChange(ev) {
      if (ev.target.name in this.$data) {
        this[ev.target.name] = ev.target.value;
      }
    },
  },
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
</style>
