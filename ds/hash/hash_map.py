class hashMap:

    def __init__(self, length) -> None:
        self.length = length
        self.hm  = [None] * length

    def rehash(self):
        saved_hm = self.hm[:]
        self.length *= 2
        self.hm = [None] * self.length
        for item in saved_hm:
            if item:
                self.insert_value(item[0], item[1])

    def insert_value(self, key, value) -> None:
        if None not in self.hm:
            print("rehash")
            self.rehash()

        pos = hash(key) % self.length
        while self.hm[pos] is not None and self.hm[pos][0] != key:
            pos = (pos + 1) % self.length
        self.hm[pos] = key, value

    def look_up(self, key):
        pos = hash(key) % self.length
        start_pos = pos
        while self.hm[pos] != None:
            if self.hm[pos][0] == key:
                return self.hm[pos][1]
            pos = (pos + 1) % self.length
            if pos == start_pos: 
                break
        raise KeyError
    
    def print_keys(self):
        for item in self.hm:
            if item != None:
                print(item[0])

    


myHashMap = hashMap(2)
myHashMap.insert_value("Car", "BMW")
myHashMap.insert_value("Bird", "Sparrow")
myHashMap.insert_value("Dog", "Lab")


# value = myHashMap.look_up("efnek")
myHashMap.print_keys()

# Collision two unique keys generate the same hash