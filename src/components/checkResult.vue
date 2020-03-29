<template>
    <div class="check">
        <p><span>{{result}}</span></p>
    </div>
</template>
<script>
export default {
    name:'Check',
    props:['result'],
    data () {
        return {
            checkResult:'测试'
        }
    },
    mounted(){
        let timeout
        if(!timeout){
            timeout=setTimeout(() => {
                this.$emit('closeThis',false)
                timeout=null
            }, 1000);
        }
    }
}
</script>

<style scoped>
.check{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    text-align: center;
}
.check>p{
   position: fixed;
   min-width: 20px;
   width: 100%;
   text-align: center;
   bottom: 50%;
   font-size: 13px;
   color: #fff;
}
.check>p>span{
    display: inline-block;
   background: rgba(15, 13, 13, 0.4);
   padding: 10px 15px;
   border-radius: 10px;
}
</style>