<template>
    <div style="padding: 3%;">
        <n-card :title="$t('header.about')">
            {{ $t('aboutPage.description') }}<br />
            {{ $t('aboutPage.guiCharacter') }}<br />
            {{ $t('aboutPage.author') }}<n-button text tag="a" href="https://github.com/anzai249/"
                type="primary">anzai249</n-button> <br />
            {{ $t('aboutPage.github') }}<n-button text tag="a" href="https://github.com/anzai249/CyberGui/"
                type="primary">CyberGui</n-button> <br />
            {{ $t('aboutPage.email') }}<n-button text tag="a" href="mailto:a381811169@163.com"
                type="primary">a381811169@163.com</n-button> <br />
        </n-card>
    </div>
</template>