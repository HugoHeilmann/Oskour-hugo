<script>
  import Card from '$lib/components/Card/Card.svelte';

  const title = "Bienvenue sur ma page Svelte !";
  const message = "Ceci est un exemple avec un composant séparé."
</script>

<h1>{title}</h1>

<Card text={message} />
