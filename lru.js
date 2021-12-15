const Cache = (function(){

    class Node{
        constructor(key, value){
            this.key = key
            this.value = value
            this.next = null
            this.previous = null
        }
    }
    
    class List{
        constructor(){
            this.length = 0
            this.head = this.tail = null
        }
    
        push(node){
            if(!this.head){
                this.head = this.tail = node
            } else{
                this.tail.next = node
                node.previous = this.tail
                this.tail = node
            }
            this.length++
        }
        shift(){
            const head  = this.head
            this.splice(this.head)
            return head
        }
        splice(node){
           if (!node.next && !node.previous){
                this.head = this.tail = null
            }  else if(!node.next){
                 this.tail = node.previous;
                this.tail.next = null;
            } else if(!node.previous){
                this.head = node.next
                this.head.previous = null
            } else{
                const next = node.next
                const previous = node.previous
                previous.next = next
                next.previous = previous
                node.next = node.previous = null
            }
            this.length--
        }
    }
    
    class LRUCache{
        constructor(limit){ 
            this.limit = limit
            this.caschList = new List()
            this.caschMap = {}
        }
    
        get(key){
            if(!this.caschMap[key]){
                return -1
            }
            const value = this.caschMap[key].value
            this.put(key,value)
            return value
        }
    
        put(key, value){
            if(this.caschMap[key]){
                this.caschList.splice(this.caschMap[key])
                this.caschMap[key] = null
            }
            const node = new Node(key,value)
            this.caschList.push(node)
            this.caschMap[key] = node
            if(this.caschList.length > this.limit){
                this.caschMap[this.caschList.shift().key] = null
            }
        }
    }
  return Cache
})()



